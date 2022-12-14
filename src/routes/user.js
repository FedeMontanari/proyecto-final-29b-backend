const { Router } = require("express");
const { User } = require("../db");
const { Op } = require("sequelize");
const { API_KEY, JWT_SECRET } = process.env;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = Router();

router.get("/name/:fullName", async (req, res) =>
{
  if (API_KEY === req.query.apikey)
  {
    let { fullName } = req.params;
    let arr = fullName.split(" ");
    arr = arr.map((e) =>
    {
      let word = e.split("");
      word[0] = word[0].toUpperCase();
      word = word.join("");
      return word;
    });
    arr = arr.join(" ");
    try
    {
      const findUser = await User.findAll({
        where: {
          fullName: { [Op.iLike]: `%${arr}%` },
        },
      });
      if (findUser.length === 0)
      {
        res.status(400).send("Name not found");
      } else
      {
        res.status(200).json(findUser);
      }
    } catch (error)
    {
      res.status(400).send(console.log(error));
    }
  } else
  {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.get("/id/:id", async (req, res) =>
{
  if (API_KEY === req.query.apikey)
  {
    const { id } = req.params;
    try
    {
      if (isNaN(id)) res.status(400).send("ID must be a number");
      const findUser = await User.findOne({
        where: {
          id: id,
        },
      });
      if (findUser) {
        return res.status(200).json(findUser);
      } else {
        return res.status(404).send("User not found");
      }
    } catch (error)
    {
      res.status(400).send(console.log(error));
    }
  } else
  {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.get("/", async (req, res) =>
{
  if (API_KEY === req.query.apikey)
  {
    try
    {
      const allUsers = await User.findAll();
      return res.json(allUsers);
    } catch (error)
    {
      return res.status(404).send(console.log(error));
    }
  } else
  {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.post("/", async (req, res) =>
{
  if (API_KEY === req.query.apikey)
  {
    try
    {
      const {
        fullName,
        phoneNumber,
        email,
        occupation,
        address,
        password,
        image,
        description,
        birthday,
        isProfessional,
        isAdmin
      } = req.body;
      if (
        !fullName ||
        !phoneNumber ||
        !email ||
        !address ||
        !password ||
        !description ||
        !birthday
      )
      {
        return res.status(400).send("Missing value detected.");
      } else
      {
        const oldUser = await User.findOne({
          where: {
            email: email,
          },
        });
        if (oldUser)
        {
          return res.status(400).send("User with that email already exists");
        }
        const newUser = await User.create({
          fullName,
          phoneNumber,
          email,
          occupation,
          address,
          password,
          image,
          description,
          birthday,
          isProfessional,
          isAdmin
        });
        return res.status(201).send("new User created.");
      }
    } catch (e)
    {
      return res.status(400).send(console.log(e));
    }
  } else
  {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.put("/email/:email", async (req, res) =>
{
  if (API_KEY === req.query.apikey)
  {
    const paramEmail = req.params.email;
    const {
      fullName,
      phoneNumber,
      email,
      occupation,
      address,
      password,
      image,
      description,
      birthday,
      isProfessional,
    } = req.body;
    try
    {
      if (paramEmail)
      {
        const user = await User.findOne({
          where: {
            email: paramEmail,
          },
        });
        if (user)
        {
          const updatedUser = {
            fullName,
            phoneNumber,
            email,
            occupation,
            address,
            password,
            image,
            description,
            birthday,
            isProfessional,
          };
          user.update(updatedUser);
          return res.status(200).send("User updated succcessfully");
        } else
        {
          return res
            .status(404)
            .send("An user with that email could not be found");
        }
      } else
      {
        return res.status(404).send("Missing value detected");
      }
    } catch (error)
    {
      return res.status(400).send(console.log(error));
    }
  } else
  {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.delete("/email/:email", async (req, res) =>
{
  if (API_KEY === req.query.apikey)
  {
    try
    {
      const { email } = req.params;
      const { restoreuser } = req.query;
      if (!email) return res.status(400).send("Missing value detected.");
      if (restoreuser)
      {
        await User.restore({
          where: {
            email: email,
          },
        });
        return res.status(200).json({ message: "User restored." });
      }
      else
      {
        let user = await User.findOne({
          where: {
            email: email,
          },
        });
        if (user)
        {
          User.destroy({
            where: {
              email: email,
            },
          });
          return res.status(200).send("User deleted.");
        } else res.status(404).send("User with that email could not be found.");
      }

    } catch (e)
    {
      res.status(400).send(console.log(e));
    }
  } else
  {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.post("/bulk", async (req, res) =>
{
  if (API_KEY === req.query.apikey)
  {
    try
    {
      const newUsers = await User.bulkCreate(req.body);
      return res.status(200).send("Bulk created Pog");
    } catch (e)
    {
      return res.status(400).send(console.log(e));
    }
  } else
  {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.post(
  "/login",
  passport.authenticate("local", { failureMessage: true }),
  async (req, res) =>
  {
    res.send("Successful login");
  }
);

router.post("/token", async (req, res) =>
{
  const { email, password } = req.body;
  if (API_KEY === req.query.apikey)
  {
    const findUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!findUser)
    {
      return res.status(400).json({ message: "No se encontr?? un usuario con ese email" });
    }
    if (findUser.password === password)
    {
      if (findUser.isAdmin)
      {
        const token = jwt.sign(
          {
            id: findUser.id,
            fullName: findUser.fullName,
            phoneNumber: findUser.phoneNumber,
            categoryId: findUser.categoryId,
            email: findUser.email,
            addres: findUser.addres,
            image: findUser.image,
            description: findUser.description,
            birthday: findUser.birthday,
            isProfessional: findUser.isProfessional,
            role: 9,
          },
          JWT_SECRET,
          {
            expiresIn: "15d",
          }
        );
        return res.status(200).json(token);
      } else
      {
        const token = jwt.sign(
          {
            id: findUser.id,
            fullName: findUser.fullName,
            phoneNumber: findUser.phoneNumber,
            categoryId: findUser.categoryId,
            email: findUser.email,
            addres: findUser.addres,
            image: findUser.image,
            description: findUser.description,
            birthday: findUser.birthday,
            isProfessional: findUser.isProfessional,
            role: 1,
          },
          JWT_SECRET,
          {
            expiresIn: "15d",
          }
        );
        return res.status(200).json(token);
      }
    } else
    {
      return res.status(400).json({ message: "Contrase??a incorrecta" });
    }
  } else
  {
    return res.status(400).send("Wrong or missing API key");
  }
});

router.get("/authorize", passport.authenticate("jwt"), async (req, res) =>
{
  try
  {
    res.status(200).json({ message: "User is authorized" });
  } catch (error)
  {
    res.status(400).json({ error: error });
  }
});

router.get(
  "/linkedin",
  (req, res, next) =>
  {
    const { returnTo } = req.query;
    const state = returnTo ? Buffer.from(JSON.stringify({ returnTo })).toString('base64') : undefined;
    const authenticator = passport.authenticate("linkedin", { state });
    authenticator(req, res, next);
  }
);

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    failureRedirect: "/user/linkedin/error"
  }),
  (req, res) =>
  {
    try
    {
      const { state } = req.query;
      const { returnTo } = JSON.parse(Buffer.from(state, 'base64').toString());
      return res.redirect(`${returnTo}?email=${req.user.email}&password=${req.user.password}`);
    } catch { }
  }
);

router.get(
  "/linkedin/error",
  async (req, res) =>
  {
    res.status(400).json(Error('Usuario no existe'));
  }
)

module.exports = router;
