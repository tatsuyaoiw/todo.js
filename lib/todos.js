/**
 * Module dependencies.
 */

var Todo = require('./todo');

/**
 * Todos collection.
 * 
 * @param {Storage} storage
 * @constructor
 */

function Todos(storage) {
  this.storage = storage;
}


Todos.prototype = {

  /**
   * Returns all todo items.
   *
   * @returns {Array}
   * @api public
   */

  list: function() {
    return this.items;
  },

  /**
   * Add a todo item with given description.
   *
   * @param {String} desc
   * @api public
   */

  add: function(desc) {
    var todo = new Todo(desc);
    this.items.push(todo);
    this.save();
  },

  /**
   * Destroy a todo item with `id`.
   *
   * @param {Number} id
   * @api public
   */

  remove: function(id) {
    var todo = this.find(id);
    this.items.splice(this.items.indexOf(todo), 1);
    this.save();
  },

  /**
   * Find a todo item by `id`.
   *
   * @param {Number} id
   * @returns {Todo} todo item
   * @api private
   */

  find: function(id) {
    var item = this.items[id-1];
    if (!item) {
      throw new Error('Cannot find a todo item with id "' + id + '"');
    }
    return item;
  },

  /**
   * Persist the todo items.
   *
   * @api private
   */

  save: function() {
    this.storage.write(this.items);
  },

  /**
   * Lazy load the todo items and return them.
   *
   * @returns {Array}
   * @api private
   */
  get items() {
    if (!this._items) {
      this._items = this.storage.read().map(function(todo) {
        return new Todo(todo.desc);
      });
    }
    return this._items;
  }
}

/**
 * Export Todos.
 */

module.exports = Todos;