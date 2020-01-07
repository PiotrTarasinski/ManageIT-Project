import ResponseFormatterHideId from '../server/api/shared/template/ResponseFormatterHideId';

function bulkFormatHideId<DataType, ResponseFormat>(formatter: ResponseFormatterHideId<DataType, ResponseFormat>, data: DataType[]) {
  return Promise.all(
    data.map(
      eachData => formatter.format(eachData, true)
    )
  );
}

export default bulkFormatHideId;
