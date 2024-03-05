/**
 * @desc This component is a button that can be used to perform an action. It has a type, label, and onClick function.
 * @param {object} props 
 * @param {string} props.type - The type of button to render
 * @param {string} props.label - The label of the button
 * @param {function} props.onClick - The function to be called when the button is clicked
 * @param {boolean} props.fullWidth - The width of the button
 * @param {string} props.className - The class name of the button\
 * @returns
 */

const Button = (props) => {
  const types = {
    primary: 'bg-blue-500 text-white hover:bg-blue-700',
    secondary: 'bg-transparent border border-neutral-400 text-black hover:bg-neutral-200 hover:border-neutral-200',
    success: 'bg-green-500 text-white hover:bg-green-70',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-700',
    delete: 'bg-red-500 text-white hover:bg-red-700',
  };

  // TODO: Add a disabled state to the button

  return (
    <button
      className={`${types.hasOwnProperty(props.type) ? types[props.type] : ''} ${props.fullWidth ? 'w-full' : 'w-fit'} rounded-md px-4 py-2 ${props.className}`}
      onClick={(e) => props.onClick(e)}>
        {props.label}
    </button>
  )
};

export default Button