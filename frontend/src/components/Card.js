import heart from '../images/Vectorheartnew.svg'
import trach from '../images/Trashtrach.svg'

function Card(props) { 
    const onCardClick = () => {
        props.handleCardClick(props.card)
    }

    const onCardLike = () => {
        props.onCardLike(props.card)
    }

    const onCardDelete = () => {
        props.onCardDelete(props.card)
    }

    return(
        <div className="element">
            {props.isOwn ? 
                <button className="button" type="button" onClick={onCardDelete} aria-label="Удалить карточку" >
                    <img className="element__trach" src={trach} alt="Удалить"/>
                </button>
            : []}
            <img className="element__item" onClick={onCardClick} src={props.card.link} alt={props.card.name}/>    
            <div className="element__info">
                <h2 className="element__text">{props.card.name}</h2>
                <div>
                    <button type="button" onClick={onCardLike} className="button" aria-label="сердешко">
                        <img className={props.isLiked ? "element__active_heart" : "element__heart" } src={heart} alt="кнопка сердешки"/>
                    </button>
                    <div className="element__heart-count">{props.card.likes.length}</div>
                </div>

            </div>
        </div>
    )
}
export default Card