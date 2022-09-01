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

// Return a div tag which has a className:"card", and contains two <p>tags and <img>tag
// We create a card modle for each of the cards

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

  return ( // returning the cards inside a div in the HTML
    <div className="grid">{tradingCards}</div>
  );
}

// rendering TradingCardContainer and putting it the section of HTML with ID 'container'
ReactDOM.render(<TradingCardContainer />, document.getElementById('container'));
