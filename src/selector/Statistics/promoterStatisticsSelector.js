/**
 * Created by lilu on 2017/4/27.
 */
export function selectPromoterStatistics(state) {
  return state.promoterStatistics
}





export function getDaliyPerformance(state) {
    const data = selectPromoterStatistics(state).daliyPerfomance
    return data||{}


}
export function getLastDaysPerformance(state) {
  const data = selectPromoterStatistics(state).lastDaysPerformance
  return data||[]
}
export function getMonthPerformance(state) {
  const data = selectPromoterStatistics(state).monthPerformance
  return data||{}
}
export function getLastMonthsPerformance(state) {
  const data = selectPromoterStatistics(state).lastMonthsPerformance
  return data||[]
}
export function getAreaMonthPerformance(state) {
  const data = selectPromoterStatistics(state).areaMonthPerformance
  return data||[]
}
export function getArealastMonthsPerformance(state) {
  const data = selectPromoterStatistics(state).lastAreaMonthPerformance
  console.log('data',data)
  return data||[]
}