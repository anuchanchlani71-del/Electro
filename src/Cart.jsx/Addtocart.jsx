import axios from "axios";
import toast from "react-hot-toast";

export const addToCart = async (productId, price) => {
  const userId = localStorage.getItem("user_id");
  
    const response = await axios.post(
      "http://localhost:8080/api/v1/addtocart",
      {
        user: userId,
        product: productId,
        quantity: 1,
        price: price,
      }
    );

     if (response.data.success) {
      toast.success(response.data.message)
      window.dispatchEvent(new Event("cartUpdated"));
    
    }
    else {
      toast.error(response.data.message);
    }

  
  
};