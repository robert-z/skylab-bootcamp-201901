'use strict';

const mongoose = require('mongoose');
const {
	SchemaTypes: { ObjectId },
} = mongoose;
const httpStatus = require('http-status');
const { questionSchema } = require('./question.model');
const { User } = require('./user.model');

/**
 * Quiz Schema
 * @private
 */
const quizSchema = new mongoose.Schema(
	{
		author: {
			type: ObjectId,
			ref: 'User',
		},
		title: {
			type: String,
			required: true,
			maxlength: 128,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		picture: {
			type: String,
			trim: true,
		},
		questions: [questionSchema],
	},
	{ timestamps: true },
);

/**
 * Methods
 */
quizSchema.method({
	normalize() {
		const quiz = {};
		const fields = [
			'id',
			'author',
			'title',
			'description',
			'questions',
			'picture',
			'createdAt',
		];

		fields.forEach(field => (quiz[field] = this[field]));

		return quiz;
	},
});

/**
 * Statics
 */
quizSchema.statics = {
	/**
	 * Get quiz
	 *
	 * @param {ObjectId} id - The objectId of quiz.
	 * @returns {Promise<Quiz, Error>}
	 */
	async get(id) {
		try {
			let quiz = await this.findById(id).exec();

			if (quiz) {
				return quiz;
			}

			throw new Error({
				message: 'Quiz does not exist',
				status: httpStatus.NOT_FOUND,
			});
		} catch (error) {
			throw error;
		}
	},

	/**
	 * List quizzes in descending order of 'createdAt' timestamp.
	 *
	 * @returns {Promise<Quiz[]>}
	 */
	list() {
		return (
			this.find()
				.exec()
		);
	},
};

/**
 * @typedef Quiz
 */
module.exports = {
	Quiz: mongoose.model('Quiz', quizSchema),
	quizSchema,
};
