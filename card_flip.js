
function clicking(image_id) {
    card = document.getElementById(image_id);
    if (card.getAttribute('src')=="images/back_of_card.png"){
        card.src = "images/cat.png";
    }
    else if (card.getAttribute('src') == "images/cat.png"){
        card.src = "images/back_of_card.png";
    };
};
