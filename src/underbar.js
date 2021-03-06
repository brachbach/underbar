(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length -1] : array.slice(Math.max(array.length - n,0))
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i=0; i<collection.length; i++) {
        iterator(collection[i], i, collection);
      };
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      };
    };
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {  ///how can index be used here? the iterator is being called on collection[i], i, collection
      if (item === target && result === -1) {  ///note that removing result === -1 allows this to work for objects but makes it find the last occurence rather than the first
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = []
    _.each(collection,function(value) {
      if (test(value)) {
        result.push(value);
      };
    });
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection, function(value) {
      return !test(value);
    });
  };

  // Produce a duplicate-free version of the array.
  //now that I think about it, I think this could be done with _.reject
  _.uniq = function(array) {
    var result = [];
    _.each(array,function(item){
      if (_.indexOf(result,item) == -1) {
        result.push(item);
      };
    });
    return result;
  };


  // Return the results of applying an iterator to each element.
  // map() is a useful primitive iteration function that works a lot
  // like each(), but in addition to running the operation on all
  // the members, it also maintains an array of results.
  _.map = function(collection, iterator) {
    var result = [];
    _.each(collection, function(value){
      result.push(iterator(value));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    if (accumulator === undefined) {
      accumulator = collection[0];  //This won't work for an object; not sure if that's a problem
      collection = collection.slice(1) //Better way to do this is to set an initializing state if no accumulator is passed in, then accumulator = item and turn of initializing state, on the first pass of reduce
    }
    _.each(collection,function(item) {
      accumulator = iterator(accumulator,item);
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {

    if (!iterator) { //clearner as iterator = iterator _.identity
      iterator = _.identity; //cleaner with !!
    };

    return _.reduce(collection, function(testResult, item) { //could do this more cleanly w/ testResult && Boolean (iterator(item))
      if (!testResult) {
        return false;
      } 
      return Boolean(iterator(item));
    }, true);

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  // We want to test if every element does not match a truth test. If that's the case, return false. Else, return true.
  // The default iterator should again be indentity
  _.some = function(collection, iterator) {

    iterator = iterator || _.identity;

    return !_.every(collection,function(item) {
      return !iterator(item);
    })
    // TIP: There's a very clever way to re-use every() here.
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla

  //for each property in each argument, add that property to the original object
  //note that this implementation needlessly adds the properties from the original object to itself; was easier to code that way and doesn't hurt anything
  _.extend = function(obj) {
    _.each(arguments,function(additionalObject){ 
      _.each(additionalObject,function(value,key){
        obj[key] = value;
      });
    });
    return obj
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments,function(additionalObject){
      _.each(additionalObject,function(value,key){
        if (!obj.hasOwnProperty(key)) { //can use the "simple if" here: a === b && c
          obj[key] = value;
        };
      });
    });
    return obj
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  // ideally I want to use once, which would mean that I would want to express each
  // function/arguments pair as a function and then once it, then like
  // somehow keep all of the onces to look back at later (no longer think it makes sense to use once)

  //but notice that it's the function returned by memoize, not memoize itself, that
  //needs to track the different argument lists and see which have been passed before
  _.memoize = function(func) {
    var argsList = []; 
    var results = [];
    // checks whether two arrays of primitives are deeply equal 
    /*var deepEquals = function(array1,array2) {
      var areEqual = true;
      if (array1.length != array2.length) {
        areEqual = false;
      };
      _.each(array1,function(item,index) { //may be possible to do this w/ reduce, but I don't think it fits the explicit spec for reduce
        if (item != array2[index]) {
          areEqual = false;
        };
      });
      return areEqual;
    };*/
    // checks whether two things are deeply equal
    // if the things are primitives, check whether they're equal using ==
    // if they're objects, RDE of each of their elements and then return whether they're all equal
    var recursiveDeepEquals = function(thing1,thing2) { //can avoid all of this by using JSON.stringify instead of all this
      if (typeof(thing1) == "object") { //may behave strangely with undefined, haven't worried about that
        var areEqual = true;
        _.each(thing1,function(item,index) { //would be cleaner with reduce and &&
          //console.log(item,thing2[index],recursiveDeepEquals(item,thing2[index]))
          if(!recursiveDeepEquals(item,thing2[index])){
            areEqual = false;
            //console.log("swapped!")
          }
        })
        return areEqual;
      } else {
        return thing1 == thing2;
      }
    }
    // returns the index of the toFind array w/in the toSearch array, returns -1 if the toFind array isn't found
    var indexOfArrayInArray = function(searchIn,toFind) {
      var indexOfMatch = -1
      _.each(searchIn,function(item,index) {
        if (recursiveDeepEquals(item,toFind)) {
          indexOfMatch = index;
        };
      });
      return indexOfMatch
    };
    return function() {
      var indexOfArgsList = indexOfArrayInArray(argsList,arguments);
      if (indexOfArgsList == -1) {
        argsList.push(arguments);
        results.push(func.apply(this, arguments));
        indexOfArgsList = indexOfArrayInArray(argsList,arguments);
      };
      return results[indexOfArgsList];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  //I know that this can be done in fewer lines, but I couldn't figure out how to make it work converting between arguments and array.
  _.delay = function(func, wait) {
    function argsToArray(args) {
      array = []
      for (var i = 0; i < args.length; i++) {
        array.push(args[i]);
      };
      return array;
    };
    var array = argsToArray(arguments);
    setTimeout(function() {
      func.apply(this,array.slice(2));
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var origArray = array.slice(0);
    var shuffledArray = [];
    while (origArray.length > 0) {
      var randPos = Math.floor(Math.random()*origArray.length);
      shuffledArray.push(origArray[randPos]);
      origArray.splice(randPos,1);
    }
    return shuffledArray;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list. AND RETURNS A LIST OF THE RESULTS!!!
  // Note: You will need to learn a bit about .apply to complete this.
  //collection = array of items to call the function on (i.e. using dot notation)
  //functionorKey = funciton or method to be called on each item 
  //args = arg to pass into the function or method (not actually tested at all)
  // item[functionOrKey].apply(args)
  _.invoke = function(collection, functionOrKey, args) { //should be done w/map, I think
    if(typeof functionOrKey == "string") {
      return _.reduce(collection, function(accumulator, item){
        //console.log("String:" + functionOrKey);
        //console.log(item[functionOrKey]);
        accumulator.push(item[functionOrKey].apply(item, args)); // need to figure out .apply syntax.
        return accumulator
      },[])
    } else {
      return _.reduce(collection, function(accumulator, item){
        //console.log("Not string:" + functionOrKey)
        //console.log(functionOrKey.apply(item));
        accumulator.push(functionOrKey.apply(item, args)); // need to figure out .apply syntax.
        return accumulator
      },[])
    }; 
  };

  // Sort the object's values by a criterion produced by an iterator. (I think in this line object == array)
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.

  //reduce, adding the new element once it passes the comparison test (I think using each and a trigger to know whether you've placed it)
  //for each element in the original collection, check it against each element of the growing sorted collection, 
  //inserting it to the left once it's less than an element, or inserting it at the very end if it hasn't been inserted yet
  _.sortBy = function(collection, iterator) {
    if (typeof iterator == "string") {
      var secondLessThanFirst = function(item1, item2, string) {
        if (item1 == undefined) {
          return true;
        };
        if (item2 == undefined) {
          return false;
        };
        return item2[string] < item1[string];
      };
    } else {
      var secondLessThanFirst = function(item1, item2, iterator) {
        if (item1 == undefined) {
          return true;
        };
        if (item2 == undefined) {
          return false;
        };
        return iterator(item2)< iterator(item1);
      };
    };
    return _.reduce(collection.slice(1),function(accumulator, itemToAdd){
      //console.log(collection.slice(1));
      var placed = false;  // goes here instead of later b/c done for each element in the original collection
      _.each(accumulator, function(itemToCompare, index) {
        if ((placed == false) && secondLessThanFirst(itemToCompare, itemToAdd, iterator)) {
          placed = true;
          accumulator = accumulator.slice(0,index).concat(itemToAdd).concat(accumulator.slice(index));
        };
      });
      if (placed == false) {
        accumulator.push(itemToAdd);
      };
      //console.log(accumulator)
      return accumulator;
    }, [collection[0]]);
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  // create array of dimensions longest array * number of arrays and fill it with undefined
  // use _.each to fill in proper values where they exist
  _.zip = function() {
    var maxLength = 0;
    _.each(arguments, function(array) {
      if (array.length > maxLength) {
        maxLength = array.length;
      };
    });
    var result = [];
    for (var i = 0; i < maxLength; i++) {
      result[i] = [];
      for (var j = 0; j < arguments.length; j++)
        result[i][j] = undefined
    }
    _.each(arguments, function(array, indexOfArray){
      _.each(array, function(item, indexOfItem){
        result[indexOfItem][indexOfArray] = item;
      });
    });
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  //if not an array, return.
  //else, return [isArray of each element]

  //2nd try at figuring this out:
  //iterate through with reduce.
  //if not array, simply add to the growing array.
  //if array, recurse

  //that method leads to a result of [1], though not quite sure why. Want to try with _.map.

  //feeling like that's not promising. I want to try the weirder version of this:
  //does the array have any subarrays? (_.some)
  //if so, go through it w/ reduce, simply adding in non-arrays but adding in

  //tried it and can't figure out why it isn't working, seems not to be concatting properly but I doubt that's it

  //Would like to come back to this later and try the simple version again, more carefully inspecting why it's not working 
  _.flatten = function(nestedArray, result) { // I think skip this
    // if (!(Array.isArray(nestedArray))) {
    //   return nestedArray;
    // } else {
    //   return 
    // }
    // return _.reduce(nestedArray,function(accumulator,item){
    //   if (Array.isArray(item)) {
    //     accumulator.concat(_.flatten(item));
    //   } else {
    //     accumulator.push(item);
    //   };
    //   return accumulator;
    // },[]);
    // return _.map(nestedArray,function(item){
    //   if (Array.isArray(item)) {
    //     accumulator.concat(_.flatten(item));
    //   } else {
    //     accumulator.push(item);
    //   };
    //   return accumulator;
    // },[]);
    var nested = _.some(nestedArray,function(item){
      return Array.isArray(item);
    });
    if (nested) {
      return _.reduce(nestedArray,function(accumulator,item){
        if (Array.isArray(item)) {
          var denested = _.flatten(item)
          accumulator = accumulator.concat(denested) //for some reason this doesn't seem to actually be concatting anything; don't know why
        } else {
          accumulator.push(item);
        }
        return accumulator;
      },[]);
    }
    return nestedArray;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  // convert args to array
  // separate out the first array
  // _.filter it, test is that _.every other array must _.contain the element
  _.intersection = function() {
    function argsToArray(args) {
      var array = []
      for (var i = 0; i < args.length; i++) {
        array.push(args[i]);
      };
      return array;
    };
    var argsArray = argsToArray(arguments)
    return _.filter(argsArray[0], function(itemInFirstArray) {
      return _.every(argsArray, function(array) {
        return _.contains(array, itemInFirstArray);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
    // Create a results array that's the first array. 
  // Then, _reject any elements that any other array _contains (_each through them and keep track): 
  _.difference = function(array) { 
    function argsToArray(args) {
      var array = []
      for (var i = 0; i < args.length; i++) {
        array.push(args[i]);
      };
      return array;
    };
    var argsArray = argsToArray(arguments)
    return _.reject(argsArray[0], function(firstArrayElement) {
      var reject = false
      _.each(argsArray.slice(1),function(otherArray) {
        if (_.contains(otherArray,firstArrayElement)) {
          reject = true;
        };
      });
      return reject;
    });
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  // prob want to use _.delay to call something after a certain amount of time
  // run the function and then delay before exiting?
  // run the function and then in a super function have a switch on a delay?

  //debugging: AssertionError: expected spy to have been called exactly twice, but it was called thrice
  //it's not an issue of small amounts of time being off; adding +10 ms to wait doesn't change anything

  _.throttle = function(func, wait) { //do this one!
    var waiting = false;
    return function () { 
      if (!waiting) {
        func();
        waiting = true;
        _.delay(function(){
        waiting = false;
        },wait);
      };
    };
  };
}());
