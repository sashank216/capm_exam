module.exports = cds.service.impl(async function() {
    const { EmployeeSet } = this.entities;
      this.before('CREATE', EmployeeSet, (req, res) => {
          const salary = parseFloat(req.data.salaryAmount);
          const currencycode = req.data.currencycode;
          if (salary > 50000 && currencycode != "USD") {
              req.error("Employee’s salary must be less than 50000 USD");
          }
      });
   
      this.before('UPDATE','EmployeeSet', async (req,res) => {
                  if(req.data.loginName){
                    req.error("login name can't change")
                  }
                  else if (req.data.nameFirst){
                    req.error("name first can't change")
                  }
                  else{
                    try {
                        const ID = req.params[0];
                        const data = req.data
                        console.log("Hey Amigo, Your purchase order with id " + req.params[0] + " will be updated");
                        const tx = cds.tx(req);
                        await tx.update(EmployeeSet).with({
                            ...data,
                            "currency_code":"USD"
                        }).where(ID);
                    } catch (error) {
                        return "Error " + error.toString();
                    }
                  }
                 
                
      });
      this.after('UPDATE', EmployeeSet, (req, res) => {
          console.log("Update operation successful");
      });
   
      this.on('DELETE', EmployeeSet, async (req, res) => {
          const employee = await this.read(EmployeeSet, req.data.ID);
          if (employee.nameFirst.startsWith('S')) {
              req.error("Do not allow DELETE");
          }
      });
  });