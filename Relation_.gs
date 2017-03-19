var createRelation_ = function() {
  var Relation_ = function(TableClass) {
    this.Table = TableClass;
    this.predicates = [];
  };
  
  Object.defineProperties(Relation_.prototype, {
    where: { value: function(predicate) {
      this.predicates.push(predicate);
      return this;
    }},
    
    all: { value: function() {
      var records = [];
      var that = this;
      this.Table.allValues().forEach(function(values, i) {
        var record = new that.Table(that.Table.objectFrom(values), { row: i + 2 });
        var passed = true;
        for (var i = 0; i < that.predicates.length; i++) {
          passed = passed && that.predicates[i](record);
          if (!passed) break;
        }
        if (passed) records.push(record);
      });
      return this.comparator ? records.sort(this.comparator) : records;
    }},
    
    first: { value: function() {
      var records = this.all();
      return records.length > 0 ? records[0] : null;
    }},
    
    last: { value: function() {
      var records = this.all();
      return records.length > 0 ? records[records.length - 1] : null;
    }},
    
    pluck: { value: function(column) {
      var result = [];
      var that = this;
      this.all().forEach(function(record) {
        result.push(record[column]);
      });
      return result;
    }},
    
    order: { value: function(comparator) {
      this.comparator = comparator;
      return this;
    }},
  });
  
  return Relation_;
};