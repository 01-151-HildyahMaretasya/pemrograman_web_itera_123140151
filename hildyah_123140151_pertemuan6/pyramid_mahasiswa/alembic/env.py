from __future__ import with_statement
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# --- IMPORT Base metadata dari proyek Pyramid ---
# Pastikan path ini benar sesuai struktur project kamu
from pyramid_mahasiswa.models.meta import Base

# -------------------------------------------------------------------------
# Alembic Config object, untuk membaca alembic.ini
# -------------------------------------------------------------------------
config = context.config

# Setup logging dari alembic.ini
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Metadata yang akan digunakan Alembic untuk AUTOGENERATE
target_metadata = Base.metadata


# -------------------------------------------------------------------------
# OFFLINE migration mode
# -------------------------------------------------------------------------
def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


# -------------------------------------------------------------------------
# ONLINE migration mode
# -------------------------------------------------------------------------
def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,   # penting jika kamu ubah tipe kolom
            compare_server_default=True,
        )

        with context.begin_transaction():
            context.run_migrations()


# -------------------------------------------------------------------------
# Jalankan sesuai mode
# -------------------------------------------------------------------------
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
