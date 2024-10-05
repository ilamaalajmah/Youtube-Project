import React from 'react';

export function UseEffectTest() {
  const [count, setCount] = React.useState(0);
  let insideUseEffect = React.useRef(0);
  let outsideUseEffect = React.useRef(0);

  React.useEffect(() => {
    console.log("I was called from inside useEffect", insideUseEffect.current++);

  }, [count]);

  return <div>
    <button onClick={() => setCount(count + 1)} className="bg-blue-500 text-white rounded-lg px-4 py-2">
      {count}
    </button>
  </div>
}
