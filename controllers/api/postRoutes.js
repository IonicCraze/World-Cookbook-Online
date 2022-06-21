const router = require("express").Router();
const {Recipe, User, Comment } = require("../../models");

router.post("/newpost", async (req, res) => {

 console.log(req.body)
 console.log(req.session.user_id)
 try {
    const recipeData = await Recipe.create({
      name: req.body.name,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      meal: req.body.meal,
      user_id: req.session.user_id,

    });
    res.status(200).json(recipeData);
    console.log(recipeData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/breakfast", async (req, res) => {
    try {
      const breakfastData = await Recipe.findAll({
        where: {
          meal: "breakfast"
        },
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      console.log(breakfastData)
  
      const breakfastRecipes = breakfastData.map((breakfastRecipes) => breakfastRecipes.get({ plain: true }));
      console.log(breakfastRecipes);
  
      res.render("breakfastrecipes", {
        breakfastRecipes,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/lunch", async (req, res) => {
    try {
      const lunchData = await Recipe.findAll({
        where: {
          meal: "lunch"
        },
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const lunchRecipes = lunchData.map((lunchRecipes) => lunchRecipes.get({ plain: true }));
      console.log(lunchRecipes);
  
      res.render("lunchrecipes", {
        lunchRecipes,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/dinner", async (req, res) => {
    try {
      const dinnerData = await Recipe.findAll({
        where: {
          meal: "dinner"
        },
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const dinnerRecipes = dinnerData.map((dinnerRecipes) => dinnerRecipes.get({ plain: true }));
      console.log(dinnerRecipes);
  
      res.render("dinnerrecipes", {
        dinnerRecipes,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });




module.exports = router;
