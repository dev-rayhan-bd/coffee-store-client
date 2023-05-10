
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const CoffeeCard = ({ coffee,coffees,setCoffees }) => {
   
  
      // eslint-disable-next-line react/prop-types
  const {_id, name, quantity, supplier, taste, photo } = coffee;
    const handleDelete=()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
          
            fetch(`http://localhost:5000/coffee/${_id}`,{
                method:"DELETE"
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.deletedCount>0){
                    
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success',
                         
                      )
                      // eslint-disable-next-line react/prop-types
                      const remaining = coffees.filter(coffee=>coffee._id !== _id);
                    setCoffees(remaining) 
                }
            })
            }
          })
    }
  

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img src={photo} alt="Movie" />
      </figure>
      <div className="  flex w-full justify-between pr-4">
      <div className="mt-10 pl-4 ">
      <h2 className="card-title">{name}</h2>
        <p>{taste}</p>
        <p>{supplier}</p>
        <p>{quantity}</p>
      </div>
        <div className="card-actions justify-end">
          <div className="btn-group btn-group-vertical space-y-3">
            <button className="btn ">View</button>
            <Link to={`/update/${_id}`}><button className="btn">Edit</button></Link>
            <button onClick={()=>handleDelete(_id)} className="btn">X</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
