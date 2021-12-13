class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    search() {
      const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          }
        : {};
        
  
      this.query = this.query.find({ ...keyword });
      return this;
    }
  
   filter() {
       const queryCopy={...this.queryStr}
      
       // filter call remove other keywords
        
       const removeFields=["keyword","page","limit"];
       removeFields.forEach(key =>delete queryCopy[key]);

      // filter range price {"price":{"gt":"1100","lt":"2000"}} =>>> {"price":{"$gt":"1100","$lt":"2000"}}

      let regQuery = JSON.stringify(queryCopy)  
      regQuery=regQuery.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
      this.query=this.query.find(JSON.parse(regQuery))

      return this;

   }
    pagination(resultPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;
  
      const skip = resultPerPage * (currentPage - 1);   
  
      this.query = this.query.limit(resultPerPage).skip(skip);
  
      return this;
    }
  }
  
  module.exports = ApiFeatures;