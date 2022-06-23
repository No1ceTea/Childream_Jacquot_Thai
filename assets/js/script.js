/*===== ADD EVENTLISTENER =====*/
window.addEventListener("DOMContentLoaded", () => {
  /*===== VAR =====*/
  var ListeRecipient = document.getElementById("recipeList");
  add = document.getElementsByClassName("form__button");
  verif = document.getElementsByClassName("btn__prep");
  FinalResult = document.getElementById("result");
  platArray = [];
  countIngredient = [0, 0, 0];
  ingredient = [];

  /*===== ADD RECIPE =====*/
  add[0].addEventListener("click", function () {
    formule = document.getElementById("ingredient").value;
    image = document.getElementById("URLImage").value;
    if (formule && image) {
      count = 0;
      RecipeName = "";
      ingredient = "";
      for (let index = 0; index < formule.length; index++) {
        if (formule[index] == "=") {
          index++;
          count++;
        }
        if (count != 1) {
          ingredient += formule[index];
        } else {
          RecipeName = RecipeName + formule[index];
        }
      }
      
      platArray.push([RecipeName, ingredient, image]);
      var newDiv = document.createElement("div");
      var newDiv2 = document.createElement("div");
      var newNom = document.createElement("p");
      var newRecipient = document.createElement("p");
      var newImg = document.createElement("img");
      newImg.src = image;
      var newContentN = document.createTextNode(RecipeName);
      var newContentI = document.createTextNode(ingredient);
      newNom.appendChild(newContentN);
      newRecipient.appendChild(newContentI);
      newDiv2.appendChild(newNom);
      newDiv2.appendChild(newRecipient);
      newDiv2.classList.add("RecipeInBox");
      newDiv.appendChild(newDiv2);
      newDiv.appendChild(newImg);
      newDiv.classList.add("RecipeBox");
      ListeRecipient.appendChild(newDiv);
    }
  });

  /*===== COUNT INGREDIENT =====*/
  for (let i = 0; i < document.getElementsByTagName("span").length; i++) {
    document.getElementsByTagName("span")[i].addEventListener("click", function (e) {
      for (let y = 0; y < document.getElementsByClassName("choice").length; y++) {
        var element = document.getElementsByClassName("choice")[y];
        if (element.textContent == e.target.textContent) {
          countIngredient[y]++;
          document.getElementsByClassName("count")[y].style.backgroundColor = "#159215";
          document.getElementsByClassName("count")[y].textContent = countIngredient[y];
          break;
        }
        if (!element.textContent) {
          element.textContent = e.target.textContent;
          ingredient.push(e.target.textContent);
          countIngredient[y]++;
          break;
        }
      }
    });
  }

  /*===== PREPARE RECIPE =====*/
  verif[0].addEventListener("click", function () {
    search = [];
    for (let i = 0; i < ingredient.length; i++) {
      element = ingredient[i] + "*" + countIngredient[i];
      search.push(element);
    }
    searchString = search.join("+");
    if (!platArray[0]) {
      alert("Aucune recette n'est existante.");
    } else {
      for (let index = 0; index < platArray.length; index++) {
        while (FinalResult.firstChild) {
          FinalResult?.removeChild(FinalResult.lastChild);
        }
        if (platArray[index][1].replace(/ /g, "") == searchString) {
          var success = document.createElement("h1");
          var ResultName = document.createElement("p");
          var ResultImg = document.createElement("img");
          var resultcontentName = document.createTextNode(platArray[index][0]);
          var resultcontentsuccess = document.createTextNode("Félicitation! Vous venez de préparer :");
          ResultImg.src = platArray[index][2];
          success.appendChild(resultcontentsuccess);
          ResultName.appendChild(resultcontentName);
          FinalResult.appendChild(success);
          FinalResult.appendChild(ResultName);
          FinalResult.appendChild(ResultImg);
        } else {
          if (index == platArray.length - 1) {
            alert("La recette n'existe pas ou n'est pas dans le bonne ordre. Veuillez réessayer");
          }
        }
      }

      /*===== RESET PREP RECIPE =====*/
      ingredient = [];
      countIngredient = [0, 0, 0];
      for (let index = 0; index < document.getElementsByClassName("count").length; index++) {

        if (document.getElementsByClassName("count")[index].lastChild) {
          document.getElementsByClassName("count")[index].removeChild(document.getElementsByClassName("count")[index].lastChild);
          document.getElementsByClassName("count")[index].style.backgroundColor = "white";
        }
      }
      for (let index = 0; index < document.getElementsByClassName("choice").length; index++) {
        document.getElementsByClassName("choice")[index].removeChild(document.getElementsByClassName("choice")[index].lastChild);
      }
    }
  });
});
