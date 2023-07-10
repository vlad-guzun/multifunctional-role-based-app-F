
const Message = (props) => {
  
    const getStyles = (props) => {
        let baseStyles = 'w-3/4 p-4 my-4 mx-auto rounded-md text-center text-white ';
        if (props.message.msgError) {
            return baseStyles + 'bg-red-500';
        } else {
            return baseStyles + 'bg-green-500';
        }
    }
  
    return (
    <div>
      <div className={getStyles(props)}>
        {props.message.msgBody}
      </div>
    </div>
  )
}

export default Message
