import SportIcons from "../SportIcon/SportIcons";

export default function Description() {


    return (
        <div>
            <h1>UserName</h1>
            <p>Location</p>
            <p>Age</p>
            <p>About me</p>
            <div>
                <SportIcons />
                <SportIcons />
                <SportIcons />
            </div>
            <button>Edit profile</button>
        </div>
    );
}
