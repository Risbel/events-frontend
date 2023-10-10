import { Button } from '../ui/button'

const ButtomDiscart = ({
  text,
  setIsActiveForm,
}: {
  text: string
  setIsActiveForm: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <Button
      onClick={() => setIsActiveForm(false)}
      className="w-full px-4 py-2 leading-none font-medium text-white bg-red-900/90 rounded-full hover:bg-red-800/80 focus:outline-none focus:shadow-outline"
    >
      {text}
    </Button>
  )
}

export default ButtomDiscart
