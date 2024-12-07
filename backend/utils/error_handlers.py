from flask import jsonify
import traceback
import logging

def setup_error_handlers(app):
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        filename='secret_santa_app.log'
    )
    logger = logging.getLogger(__name__)

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            'error': 'Bad Request',
            'message': str(error)
        }), 400

    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({
            'error': 'Unauthorized',
            'message': 'Authentication required'
        }), 401

    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({
            'error': 'Forbidden',
            'message': 'You do not have permission to access this resource'
        }), 403

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'error': 'Not Found',
            'message': 'The requested resource could not be found'
        }), 404

    @app.errorhandler(500)
    def internal_server_error(error):
        logger.error(f"Unhandled Exception: {str(error)}")
        logger.error(traceback.format_exc())

        return jsonify({
            'error': 'Internal Server Error',
            'message': 'An unexpected error occurred. Please try again later.'
        }), 500

    @app.errorhandler(Exception)
    def handle_exception(e):
        logger.error(f"Unhandled Exception: {str(e)}")
        logger.error(traceback.format_exc())
        
        return jsonify({
            'error': 'Unexpected Error',
            'message': 'An unexpected error occurred'
        }), 500