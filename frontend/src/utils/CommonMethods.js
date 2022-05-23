

function formatDate(date){
    let temp = new Date(date);
    temp = temp.toLocaleDateString();
    return temp;
  }




const CommonMethods = {formatDate}
export default CommonMethods