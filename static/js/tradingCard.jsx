/*const tradingCardData = [
  {
    name: 'Balloonicorn',
    skill: 'video games',
    imgUrl: '/static/img/balloonicorn.jpg',
    cardId: 1,
  },
  {
    name: 'Float',
    skill: 'baking pretzels',
    imgUrl: '/static/img/float.jpg',
    cardId: 2,
  },
  {
    name: 'Llambda',
    skill: 'knitting scarves',
    imgUrl: '/static/img/llambda.jpg',
    cardId: 3,
  },
  {
    name: 'Off-By-One',
    skill: 'climbing mountains',
    imgUrl: '/static/img/off-by-one.jpeg',
    cardId: 4,
  },
  {
    name: 'Seed.py',
    skill: 'making curry dishes',
    imgUrl: '/static/img/seedpy.jpeg',
    cardId: 5,
  },
  {
    name: 'Polymorphism',
    skill: 'costumes',
    imgUrl: '/static/img/polymorphism.jpeg',
    cardId: 6,
  },
  {
    name: 'Short Stack Overflow',
    skill: 'ocean animal trivia',
    imgUrl: '/static/img/shortstack-overflow.jpeg',
    cardId: 7,
  },
  {
    name: 'Merge',
    skill: 'bullet journaling',
    imgUrl: '/static/img/merge.png',
    cardId: 8,
  },
]; */


function AddTradingCard(props) {
  // use useState hook to set value of the name, create a function to update the name
  // use useState hook to set value of the skill, create a function to update the skill
  const [name, setName] = React.useState("");
  const [skill, setSkill] = React.useState("");

  function addNewCard() {
    fetch("/add-card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"name": name, "skill": skill})
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        //alert(`Card added! Response: ${jsonResponse}`);
        TradingCardContainer(jsonResponse)
      });
  }
  return (
    <React.Fragment>
      <h2>Add New Trading Card</h2>
      <label htmlFor="nameInput">Name</label>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        id="nameInput"
        style={{ marginLeft: "5px" }}
      ></input>
      <label
        htmlFor="skillInput"
        style={{ marginLeft: "10px", marginRight: "5px" }}
      >
        Skill
      </label>
      <input
        value={skill}
        onChange={(event) => setSkill(event.target.value)}
        id="skillInput"
      ></input>
      <button style={{ marginLeft: "10px" }} onClick={addNewCard}>
        Add
      </button>
    </React.Fragment>
  );
}


// Return a div tag which has a className:"card", and contains two <p>tags and <img>tag
// We create a card modle for each of the cards
// TradingCard expecting props
function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} alt="profile" />
      <p>Skill: {props.skill} </p>
    </div>
  );
}


// We use the useState hook to set a value to cards and create a function to update them
// We fetch data the app route '/card.json' and we use it to set cards

function TradingCardContainer() {
   //  [cards,  function to update cards]
  const [cards, setCards] = React.useState([]);

  React.useEffect(() =>{
    fetch('/cards.json')
    .then((response) => response.json())
    .then((data) => setCards(data.cards))
  }, []) // this empty array means that the hook useEffect only runs once
  

  const tradingCards = [];

// we push the cards to the array tradingCards
  for (const currentCard of cards) {
    tradingCards.push(
      <TradingCard  // calling the TradingCard function
        key={currentCard.name} // assigns name values to the data in data.cards
        name={currentCard.name}
        skill={currentCard.skill}
        imgUrl={currentCard.imgUrl}
      />
    );
  }

  // returning the cards inside a div in the HTML
  return (
    <React.Fragment>
      <AddTradingCard />
      <h2>Trading Cards</h2>
      <div className="grid">{tradingCards}</div>
    </React.Fragment>
  );
}

// rendering TradingCardContainer and putting it the section of HTML with ID 'container'
ReactDOM.render(<TradingCardContainer />, document.getElementById('container'));
