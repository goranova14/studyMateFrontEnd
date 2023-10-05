const request = async (url, options = {}) => {

  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    // const errorElement = document.createElement('div');
    // errorElement.innerHTML = errorText;
    // const errorTextContent = errorElement.textContent || errorElement.innerText;
    //  console.log(errorTextContent);
    // throw Error(errorTextContent.response.data.message);
    const errorMessage = errorData.message;
    console.log(errorMessage);
    throw Error(errorMessage);

  }
  else {
    const responseData = await response.json();
    return responseData;
  }


};

export default request; 