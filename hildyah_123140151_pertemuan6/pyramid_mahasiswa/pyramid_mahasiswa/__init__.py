from pyramid.config import Configurator

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application. """
    with Configurator(settings=settings) as config:
        # Template engine
        config.include('pyramid_jinja2')

        # Tambahkan ini agar request.tm tersedia
        config.include('pyramid_tm')
        config.include('pyramid_retry')

        # Load database + routes
        config.include('.models')
        config.include('.routes')

        # Scan semua view
        config.scan('pyramid_mahasiswa.views')

    return config.make_wsgi_app()
