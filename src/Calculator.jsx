import React, { useState } from 'react'

const buttons =
    [
        "AC", "+/-", "%", "/",
        "7", "8", "9", "*",
        "4", "5", "6", "-",
        "1", "2", "3", "+",
        "0", ".", "="
    ];

function Calculator() {
    const [display, setDisplay] = useState('');

    const AddSpaces = (str) => {
        return str.replace(/(\d{3})(?=\d)/g, '$1 ');
    }

    function AddingValuesToDisplay(button) {
        switch (button) {
            case "AC":
                setDisplay([]);
                break;
            case "+/-":
                setDisplay(display * -1);
                break;
            case "%":
                setDisplay(display / 100);
                break;
            case ".":
                setDisplay(display + '.');
                break;
            case "=":
                try {
                    let result = eval(display.replace(/\s+/g, ''));
                    { result === Infinity ? setDisplay("Error") : setDisplay(AddSpaces(String(result))) }
                }
                catch {
                    setDisplay('Error');
                }
                break;
            default:
                let newDisplay = display + button;
                { display.length < 16 && setDisplay(AddSpaces(newDisplay)) }
                break;
        }
    }

    return (
        <div className="w-screen h-full justify-center box-border mx-auto">
            <div className="w-[430px] h-[600px] bg-white mx-auto px-4 rounded-md shadow-md">
                <div className="mb-4 py-3">
                    <div
                        className={`w-full mx-auto h-20 text-gray-50 bg-gray-500 rounded ${(display.length >= 6) && 'text-4xl py-6 '} text-5xl font-semibold p-4 text-right mb-51`}>
                        {display}
                    </div>
                </div>
                <div className="w-full mx-auto grid px-4 grid-cols-4 gap-2 text-gray-900">
                    {buttons.flat().map((button, index) => (
                        <button
                            key={index}
                            onClick={() => AddingValuesToDisplay(button)}
                            className={`${(button === "0") ? 'col-span-2 w-44' : ''} bg-gray-200 active:outline-none focus:outline-none text-2xl hover:border-none p-1 rounded-full w-20 h-20`}
                        >
                            {button}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Calculator