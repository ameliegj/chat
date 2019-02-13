/*
Service methodes
check if the form is sending he good data and no missing or extra field
*/
const checkFields = (requiredFieldsArray, bodyParams) => {
    const missedFields = [];
    const extraFields = [];
  
    // Check missing fields
    requiredFieldsArray.forEach((prop) => {
      if (!(prop in bodyParams)) missedFields.push(prop);
    });
  
    // Check extra fields
    for (const prop in bodyParams) {
      if (requiredFieldsArray.indexOf(prop) === -1) extraFields.push(prop);
    }
  
    // Check if there's extra or missing fields
    const ok = (extraFields.length === 0 && missedFields.length === 0);
  
    // Send objects response
    return { ok, extraFields, missedFields };
  };
//

/*
Export
*/
  module.exports = {
    checkFields,
  };
//