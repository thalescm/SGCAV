'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Acidente Schema
 */
var AcidenteSchema = new Schema({
    idAcidente: {
        unique: true,
        type: Number,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    endereco: {
        rua: {
          type: String,
          required: true
        },
        complemento: {
          type: String
        },
        bairro: {
          type: String,
          required: true
        },
        cidade: {
          type: String,
          required: true
        },
        estado: {
          type: String,
          required: true
        }
    },
    missoesIds: {
        type: Array,
        default: []
    },
    veiculos: {
      type: Number,
      required: true
    },
    vitimas: {
      type: Number,
      required: true
    }
});


/**
 * Pre-save hook
 */
AcidenteSchema.pre('save', function(next) {
    next();
});

/**
 * Methods
 */
AcidenteSchema.methods = {

};

mongoose.model('Acidente', AcidenteSchema);
