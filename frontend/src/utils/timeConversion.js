export function UTC2IST(utcString){
    const utcDate=new Date(utcString);
    const options = {
     timeZone: 'Asia/Kolkata',
     year: 'numeric',
     month: 'short',
     day: 'numeric'
    };
    const date = utcDate.toLocaleDateString('en-US', options);
    const time = utcDate.toLocaleTimeString('en-IN', {
       timeZone: 'Asia/Kolkata',
       hour:'2-digit',
       minute:'2-digit',
       hour12:true

      });

    return {date,time};
    

  
  }