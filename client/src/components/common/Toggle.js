export const Toggle = ({ ischecked, handleChange, onClicks }) => {
  return (
    // Switch Container
    <div>
      {/* Hidden Checkbox Input */}
      <input
        id="toggle"
        type="checkbox"
        className="hidden"
        checked={ischecked}
        onChange={handleChange}
      />
      {/* Label Element */}
      <label
        htmlFor="toggle"
        onClick={onClicks}
        className={`${
          ischecked ? "bg-purple-600" : "bg-gray-200"
        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          aria-hidden="true"
          className={`${
            ischecked ? "translate-x-1" : "-translate-x-4"
          } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
        />
      </label>
    </div>
  );
};
export default Toggle;
