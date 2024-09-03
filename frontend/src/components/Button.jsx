import { Link } from 'react-router-dom';

const Button = ({ children, onClick, className = '', to, ...props }) => {
  const Component = to ? Link : 'button'; // Use Link if 'to' prop is provided, otherwise default to 'button'

  return (
    <Component
      to={to}
      onClick={onClick}
      className={`py-2 px-3 rounded-md ${className} text-white font-semibold`}
      {...props}
    >
      {children}
    </Component>
  );
};

Button.defaultProps = {
  onClick: () => {},
  className: '',
  to: null, // Default to null (not a Link)
};

export default Button;
