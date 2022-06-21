const router = require("express").Router();
const { User, Recipe } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
      const recipeData = await Recipe.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const recipes = recipeData.map((recipes) => recipes.get({ plain: true }));
      console.log(recipes);
  
      res.render("homepage", {
        recipes,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  



  router.get('/post/:id', async (req, res) => {
    try {
      const recipeData = await Recipe.findByPk(req.params.id, {
        
      });
      const recipe = recipeData.get({ plain: true });
      res.render('singlerecipe', {
        recipe,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


 
  
  
  

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/post", (req, res) => {
  res.render("post");
});








module.exports = router;
