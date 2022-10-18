const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0); // last midnight
  return d;
};

today.id = 'today';
today.label = 'today()';
today.description = 'returns the current date value Date.now()';
today.tags = ['convert', 'date'];
today.type = 'Identifier';

export default today;
