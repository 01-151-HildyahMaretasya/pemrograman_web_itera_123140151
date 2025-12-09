from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import DBAPIError

from .. import models


# --- LIST MAHASISWA ---
@view_config(route_name='mahasiswa_list', renderer='json')
def mahasiswa_list(request):
    try:
        query = request.dbsession.query(models.Mahasiswa).all()
        data = [m.to_dict() for m in query]
        return {'status': 'success', 'data': data}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}


# --- DETAIL MAHASISWA ---
@view_config(route_name='mahasiswa_detail', renderer='json')
def mahasiswa_detail(request):
    try:
        mhs_id = request.matchdict.get('id')
        mhs = request.dbsession.query(models.Mahasiswa).get(mhs_id)
        if not mhs:
            return Response(json_body={'error': 'Not found'}, status=404)
        return {'status': 'success', 'data': mhs.to_dict()}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}


# --- TAMBAH MAHASISWA ---
@view_config(route_name='mahasiswa_add', request_method='POST', renderer='json')
def mahasiswa_add(request):
    try:
        data = request.json_body
        mhs = models.Mahasiswa(**data)
        request.dbsession.add(mhs)
        return {'status': 'success', 'message': 'Mahasiswa ditambahkan'}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}


# --- HAPUS MAHASISWA ---
@view_config(route_name='mahasiswa_delete', request_method='DELETE', renderer='json')
def mahasiswa_delete(request):
    try:
        mhs_id = request.matchdict.get('id')
        mhs = request.dbsession.query(models.Mahasiswa).get(mhs_id)

        if not mhs:
            return Response(json_body={'error': 'Not found'}, status=404)

        request.dbsession.delete(mhs)
        return {'status': 'success', 'message': 'Mahasiswa dihapus'}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}
