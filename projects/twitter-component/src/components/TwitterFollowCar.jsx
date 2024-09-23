import { useState } from "react";

export const TwitterFollowCar = ({ userName = "unknow", name = "unknow", initialIsFollowin }) => {
    const [ isFollowin, setIsFollowin ] = useState(initialIsFollowin);

    const handleClick = () => {
        setIsFollowin(!isFollowin);
    };


    const text = isFollowin ? "Siguiendo" : "Seguir";
    const btnClassName = isFollowin
        ? "tw-followCar-button is-followin"
        : "tw-followCar-button";

    return (
        <article className="tw-followCar">
            <header className="tw-followCar-header">
                <img
                    className="tw-followCar-avatar"
                    alt='Avatar de midudev'
                    src={`https://unavatar.io/twitter/${userName}`}
                />
                <div className="tw-followCar-info">
                    <strong>{name}</strong>
                    <span>@{userName}</span>
                </div>
            </header>

            <aside>
                <button className={btnClassName} onClick={handleClick}>
                    <span className="tw-followCar-text">{text}</span>
                    <span className="tw-followCar-stopFollow">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
};