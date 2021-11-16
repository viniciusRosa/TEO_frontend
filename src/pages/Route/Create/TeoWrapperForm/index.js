import React, { useEffect, useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './validation';
import TeoForm from '../../../../components/TeoForm';
import TeoField from '../../../../components/TeoField';
import { FormColums, ErrorMessage } from './styles';
import TeoModal from '../../../../components/TeoModal';
import { useHistory } from 'react-router-dom'
import { useRoute } from '../../../../contexts/RouteContext';
import { usePoint } from '../../../../contexts/PointContext';
import TeoPointForm from '../../../Point/Create/TeoPointForm';


import {
  DivRow,
  PointBox,
  Subtitle
} from './styles';

const TeoWrapperForm = () => {

  const [modalIsActived, setModalIsActived] = useState(false);
  const [modalIsActivedSuccess, setModalIsActivedSuccess] = useState(false);
  const [modalIsActivedError, setModalIsActivedError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedShift, setSelectedShift] = useState('');
  const form = useRef(null);

  const [pointLoaded, setPointLoaded] = useState([]);

  const [selectedInitialPoint, setSelectedInitialPoint] = useState({});
  const [selectedFinalPoint, setSelectedFinalPoint] = useState({});
  const [selectedPoints, setSelectedPoints] = useState([]);

  const [pointList, setPointList] = useState([]);

  const history = useHistory();

  const {
    createRoute
  } = useRoute();

  const {
    loadPointList
  } = usePoint();

  useEffect(() => {
    async function getPoints() {
      const points = await loadPointList();
      setPointLoaded(points)
    }

    getPoints();

  }, [])

  const { errors, trigger, reset, handleSubmit, ...methods } = useForm({
    resolver: yupResolver(schema),
  });

  const handleshift = (event) => {
    const shift = event.target.value;
    setSelectedShift(shift)
  }

  const handlePointlist = (event) => {
    const {name, value} = event.target;

    if (name === 'saida') {
      setSelectedInitialPoint({
        value
      })
    }

    if (name === 'chegada') {
   
      setSelectedFinalPoint({
        id: value
      })

      console.log(selectedFinalPoint)
    }

    if (name === 'pontoDeParada') {
      const arrayPoints = selectedPoints;
      arrayPoints.push({
        id: value
      })
      setSelectedPoints(arrayPoints)
    }

    const arrayPoints = selectedPoints;
    arrayPoints.push(selectedFinalPoint)

    setSelectedPoints(arrayPoints)

    console.log(selectedFinalPoint)
    // console.log(name, value)
  }

  // console.log(selectedFinalPoint)


/* SELECAO DE ROTAS - handlePointlist


  function handleSelectItem(id: number) {

    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item !== id);
        setSelectedItems(filteredItems);
    }else {

        setSelectedItems([...selectedItems, id])
    }

}

 const { name, value} = event.target;

const items = selectedItems;

        const data = new FormData();


            data.append('items', items.join(','));


arr
Array(4) [ "primeiro", "meio", "terceiro", "ultimo" ]

arr.splice(arr.length - 1, 0, 'terceiro')
Array []

arr.splice(arr.length - 1, 0, 'penultimo')
Array []

arr
Array(6) [ "primeiro", "meio", "terceiro", "terceiro", "penultimo", "ultimo" ]

arr.splice(0, 1, 'troquei')
Array [ "primeiro" ]

arr.splice(0, 1, 'troquei denovo')
Array [ "troquei" ]

arr.splice(arr.length, 1, 'troquei ultimo')
Array []

arr.splice(arr.length -1, 1, 'troquei ultimo')
Array [ "troquei ultimo" ]

arr.splice(arr.length -1, 1, 'ultimo')
Array [ "troquei ultimo" ]

arr.splice(arr.length -1, 1)
Array [ "ultimo" ]

arr.splice(arr.length -1, 1, 'troquei ultimo')
Array [ "ultimo" ]

acc = ['el4', 'el5']
Array [ "el4", "el5" ]

acc.map(a => {
  arr.splice(arr.length -1, 0, a)
})
Array [ undefined, undefined ]

arr
Array(11) [ "troquei denovo", "meio", "terceiro", "terceiro", "penultimo", "el1", "el2", "el3", "el4", "el5", … ]
*/


  const newRote = async (data) => {
    setModalIsActived(!modalIsActived)
    // setLoading(true)
    console.log(data)
    // try {
    //   await createRoute(data);
    //   setLoading(false)
    //   setModalIsActivedSuccess(!modalIsActivedSuccess)
    // } catch (err) {
    //   console.log(err);
    //   setLoading(false)
    //   setModalIsActivedError(!modalIsActivedError)
    // }
  }

  function activeModal() {
    setModalIsActived(!modalIsActived)
  }

  function activeModalSuccess() {
    setModalIsActivedSuccess(!modalIsActivedSuccess)
  }

  function activeModalError() {
    setModalIsActivedError(!modalIsActivedError)
  }

  function resetButtonModal() {
    setModalIsActived(!modalIsActived)
  }

  function resetButtonSuccess() {
    reset({})
    setModalIsActivedSuccess(!modalIsActivedSuccess)
  }

  function resetButtonError() {
    reset({})
    setModalIsActivedError(!modalIsActivedError)
  }

  return (
    <>
      <FormProvider {...methods}>

        <TeoForm onSubmit={handleSubmit(newRote)} ref={form}>

          <TeoField.Text label="Nome da rota" type="text" name="name" register={methods.register} />
          {errors.name && (<ErrorMessage>{errors.name.message}</ErrorMessage>)}

          <TeoField.Text label="Vagas" type="text" name="vacancy" register={methods.register} />
          {errors.vacancy && (<ErrorMessage>{errors.vacancy.message}</ErrorMessage>)}

          <FormColums>
            <TeoField.Select size='20%' name='shift' label='Turno' onChange={handleshift} value={selectedShift} register={methods.register}>
              <option value='Manhã'>Manhã</option>
              <option value='Tarde'>Tarde</option>
              <option value='Noite'>Noite</option>


            </TeoField.Select>

          </FormColums>

          {modalIsActived && <TeoModal.Warning closeModal={activeModal} secondary={resetButtonModal}>Tem Certeza?</TeoModal.Warning>}
          {modalIsActivedSuccess && <TeoModal.Success closeModal={activeModalSuccess} text={'Rota inserida com sucesso'} button={resetButtonSuccess} />}
          {modalIsActivedError && <TeoModal.Success closeModal={activeModalError} text={'Algo deu Errado'} button={resetButtonError} />}
          {loading && <TeoModal.Loading />}

        </TeoForm>
      </FormProvider>

      <DivRow>



        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>

          <Subtitle>Pontos de parada</Subtitle>

          <FormColums>
            <TeoField.Select name='saida' label='Saída' onChange={handlePointlist} >
            <option value='0'>default</option>
              {
                pointLoaded.map(point => {
                  return (
                    <option key={point.id} value={point.id}>{point.name}</option>
                  )
                })
              }
            </TeoField.Select>
           
          </FormColums>

          <PointBox>

            <FormColums>
              <TeoField.Select name='pontoDeParada' label='Parada' onChange={handlePointlist}>
              <option value='0'>default</option>
              {
                pointLoaded.map(point => {
                  return (
                    <option key={point.id} value={point.id}>{point.name}</option>
                  )
                })
              }
              </TeoField.Select>
                <button
                  className="w3-button w3-red w3-round w3-text-white w3-small"
                  style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                  width: '2rem',
                  height: '3rem' 
                }}>
                X
              </button>
            </FormColums>

            { selectedPoints.map(point => {
              return (
                <FormColums>
                  <TeoField.Select name='pontoDeParada' label='Parada' onChange={handlePointlist}>
                  <option value='0'>default</option>
                  {
                    pointLoaded.map(point => {
                      return (
                       <option key={point.id} value={point.id}>{point.name}</option>
                      )
                    })
                  }
                  </TeoField.Select>
                  <button
                    className="w3-button w3-red w3-round w3-text-white w3-small"
                    style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignSelf: 'flex-end',
                    width: '2rem',
                    height: '3rem' 
                  }}>
                    X
                  </button>
                </FormColums>
              )
            }) }

            <button
              className="w3-button w3-teal w3-round"
              style={{ width: "30%" }}
              onClick={() => { }
              }>+ Inserir ponto de parada</button>

          </PointBox>

          <FormColums>
            <TeoField.Select name='chegada' label='Chegada' onChange={handlePointlist}>
            <option value='0'>default</option>
              {
                pointLoaded.map(point => {
                  return (
                    <option key={point.id} value={point.id}>{point.name}</option>
                  )
                })
              }
            </TeoField.Select>
          </FormColums>


        </div>
        <div>
        <Subtitle>Cadastrar ponto de parada</Subtitle>
          <TeoPointForm />
        </div>

      </DivRow>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <button
          className="w3-button w3-teal w3-round"
          style={{ width: "25%" }}
          onClick={
            async () => {
              const result = await trigger();
              if (result) {
                activeModal()
              }
            }
          }>Cadastrar rota</button>

        <button
          className="w3-button w3-orange w3-round w3-text-white"
          style={{ width: "25%" }}
          onClick={
            () => history.push('/routes')
          }
        >Cancelar</button>
      </div>
    </>
  )
}

export default TeoWrapperForm;
