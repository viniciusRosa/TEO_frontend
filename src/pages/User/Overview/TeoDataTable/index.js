import React, { useEffect, useState } from 'react';
import { ViewTable, TableHead, TableRow, DivHead, CheckBox } from './styles'
import { useLocation, useHistory } from 'react-router-dom';
import { useUser } from '../../../../contexts/UserContext';


const TeoDataTable = () => {

  const { state } = useLocation();
  const history = useHistory();

  const [result, setResult] = useState({})
  const [checked, setChecked] = useState(false);

  const {
    loadUser,
    updateActivity
   } = useUser()

  useEffect(() => {
    async function getUser() {
      const user = await loadUser(state.user);
      setChecked(Number(user.is_active) === 1 ? true : false)
      setResult(user)
    }
    getUser()
  }, [])

  useEffect(() => {
    async function changestatus() {
      const changeActivity = await updateActivity(result.id, checked);
    }
  changestatus()
  },[checked])

  const handleChange = async () => {
    setChecked(!checked)
    //const changeActivity = await updateActivity(result.id, checked);
    // setChecked(changeActivity === 1 ? true : false)

  };
  console.log(checked)

  async function goToUpdate() {

    history.push({
      pathname: '/usuarios/update',
      state: {
        user: result,
      }
    })
  }

  return (
    <div>
      <DivHead>
        <button
          className='w3-button w3-dark-grey w3-round'
          onClick={() => history.push('/usuarios')}>
          Voltar
        </button>

        <p>{result.name}</p>

        <button
          className='w3-button w3-amber w3-round'
          onClick={() => goToUpdate(result.id)}>
          Editar
        </button>
      </DivHead>
      <ViewTable>
        <TableHead >
          <p></p>
        </TableHead>
        <tbody>
          <TableRow>
            <td>Nome</td>
            <td>{result.name}</td>
          </TableRow>

          <TableRow>
            <td>Email</td>
            <td>{result.email}</td>
          </TableRow>

        </tbody>
      </ViewTable>

      <CheckBox>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        Ativo
      </label>
      </CheckBox>

    </div>

  )
}

export default TeoDataTable;
