// Make a function that takes in a prop called ensNames and renders a list of the names
// where each name is an object with a property called name. Just display the name, center the
// text using tailwind css and on hover, make the background have a white border

function EnsNames({ ensNames, setTarget }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {ensNames.map((ens) => (
        <button
          className="flex justify-center items-center py-4 px-8 border-transparent hover:border-white border-y-2 mouse-pointer"
          key={ens.name}
          onClick={() => setTarget(ens.name)}
        >
          {ens.name}
        </button>
      ))}
    </div>
  );
}

export default EnsNames;
