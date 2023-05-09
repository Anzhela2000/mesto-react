
function Card(cards, onCardClick) {

    const handleClick = ()=>{
        cards.onCardClick(cards);
      }

    return (
        <div className="gallery__item" key={cards._id}>
            <button className="gallery__picture_click" onClick={handleClick}><div className="gallery__picture" style={{ backgroundImage: `url(${cards.link})` }}  onClick={ handleClick }  /></button>
            <div className="gallery__bottom">
                <h2 className="gallery__title">{cards.name}</h2>
                <div className="gallery__counter_likes">
                    <button className="gallery__button-like" type="button"></button>
                    <span className="gallery__like-count">{cards.likes.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Card;