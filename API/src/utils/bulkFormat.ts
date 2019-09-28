import ResponseFormatter from '../server/api/shared/template/ResponseFormatter';

function bulkFormat<DataType, ResponseFormat>(formatter: ResponseFormatter<DataType, ResponseFormat>, data: DataType[]) {
  return Promise.all(
    data.map(
      eachData => formatter.format(eachData)
    )
  );
}

export default bulkFormat;
