var faker = require('faker');
function generateProfiles()
{
    var information = [];
    for(var id = 0;id<50000 ; id++)
    {
        var firstname = faker.name.firstName();
        var age = faker.random.number({min:23, max:60});
        
        var company = faker.company.companyName();
        var city = faker.address.city()  ;  
        
        
        information.push({
            "id" : id,
            "Name" : firstname,
            "Age"  : age,
            "Company" : company,
            "City" : city,
           
          

        })
    }
    return{"information" : information}
}
generateProfiles();
module.exports = generateProfiles