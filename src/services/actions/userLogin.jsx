"use server"

export const userLogin = async ( formData) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",  
          },
          body: JSON.stringify(formData), 
          cache: "no-store",
        }
      );
    
      if (!res.ok) {
        const error = await res.text(); 
        throw new Error(error);
      }
    
      const userInfo = await res.json();
      return userInfo;
};