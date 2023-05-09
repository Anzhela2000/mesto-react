import Card from './Card';

function Main({ onEditProfile, onEditAvatar, onAddPlace, userName, userDescription, userAvatar, cards, onCardClick }) {

    return (<main>
        <section className="profile">
            <button className="profile__avatar-button" title="Сменить аватар" onClick={onEditAvatar}>
                <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} />
            </button>
            <div className="profile__info">
                <h1 className="profile__name">{userName}</h1>
                <button className="profile__button-change" type="button" onClick={onEditProfile}></button>
                <p className="profile__job">{userDescription}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>
        <ul className="gallery">
            {
                cards.map((card) =>
                    <Card
                        key={card._id}
                        likes={card.likes}
                        name={card.name}
                        link={card.link}
                        onCardClick={onCardClick}
                    />
                )
            }
        </ul>
    </main>)
}

export default Main;