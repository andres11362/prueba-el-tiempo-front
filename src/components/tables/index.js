import React, { useState } from 'react';
import Modal from '../modals';
import { routeFiles } from '../../constants/routeFiles';

/**
 * Componente tabla, cada consulta sin importar 
 * sus cabeceras o cantidad de datos viajara
 * a este control
 */

const Tabla = ({ headers, rows, type, changePage, page, handleDelete }) => {

  const [lastPage] = useState(rows.last_page);
  const pageNumbers = [];
  const [modal, setModal] = useState({
    open: false,
    title: '',
    action: ''
  });

  const setOpenModal = (titulo, action) => {
    setModal({
      ...modal,
      open: true,
      title: titulo,
      action
    });
  }

  const setCloseModal = () => {
    setModal({
      open: false,
      title: '',
      action: ''
    });
  }

  for (let index = 0; index < lastPage; index++) {
    pageNumbers.push(index + 1);
  }

  const actionButtons = (id) => (
    <tr className="p-3 text-center flex justify-center">
      {type !== 'users' && (
        <>
          <button href="#" class="bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white text-center py-2 px-4 rounded">
            Editar
          </button>
          <button onClick={() => handleDelete(id)} href="#" class="bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-center py-2 px-4 rounded">
            Eliminar
          </button>
        </>
      )}
    </tr>
  );

  const RenderRow = (props) => props.keys.map((key, index) => (
    <td>
      {key !== 'acciones' ? (
        <div key={index} className="text-center">
          {typeof(props.data[key]) === 'string' && (props.data[key].startsWith('http') || props.data[key].startsWith('public')) ? 
            <a 
              target={'_blank'} 
              rel='noreferrer' 
              href={ props.data[key].startsWith('http') ? props.data[key] : `${routeFiles}${props.data[key]}`}
              >Enlace
            </a> : props.data[key] 
          }
        </div>
      ) : (
        <div key={index} className="text-center">
          {actionButtons(props.data['id'])}
        </div>
      )}
    </td>
  ));

  const getRowsData = () => {

    const { data } = rows;

    return data.map((row, index) => (
      <tr className="p-3" key={index}>
        <RenderRow key={index} data={row} keys={headers} id />
      </tr>
    ));
  }

  const paginator = () => (
    <>
      <div className="font-semibold text-center my-3">
        <h5>{`Pagina ${page} de ${lastPage}`}</h5>
        <nav
          className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
          aria-label='Pagination'
        >
          <button
            onClick={() => { changePage(1) }}
            disabled={page === 1}
            className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
          >
            <span>{`<<`}</span>
          </button>
          <ul className='flex pl-0 rounded list-none flex-wrap'>
            <li>
              {pageNumbers.map((number) => (
                <button
                  onClick={() => { changePage(number) }}
                  className={
                    page === number
                      ? "bg-blue border-red-300 text-red-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  }
                >
                  {number}
                </button>
              ))}
            </li>
          </ul>

          <button
            onClick={() => { changePage(lastPage) }}
            disabled={page === lastPage}
            className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
          >
            <span>{`>>`}</span>
          </button>
        </nav>
      </div>
    </>
  )

  return (
    <>
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100 flex space-x-10">
          <div className='w-full overflow-hidden float-left'>
            <h2 className="font-semibold text-gray-800">Tabla</h2>
          </div>
          <div className='w-full overflow-hidden'>
            <button
              onClick={() => { setOpenModal('Nuevo registro', 'crear') }}
              className="float-right bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-center py-2 px-4 rounded"
            >
              Nuevo registro
            </button>
          </div>
        </header>
        <div className="p-3">
          {/* Table */}
          {paginator()}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
                <tr>
                  {headers.map((item, index) => (
                    <th className="p-2" key={index}>
                      <div className="font-semibold text-center" key={index}>{item}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-gray-100">
                {/* Row */}
                {getRowsData()}
              </tbody>
            </table>
          </div>
          {paginator()}
        </div>
      </div >
      <Modal
        open={modal.open}
        setOpen={setCloseModal}
        type={type}
        title={modal.title}
      />
    </>

  );
}

export default Tabla;
