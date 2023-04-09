import { useParams } from 'react-router-dom'

function CurrencyDetail({}) {
    const {id} = useParams();
    console.log( id);
  return (
    <div>
      
    </div>
  )
}

export default CurrencyDetail
