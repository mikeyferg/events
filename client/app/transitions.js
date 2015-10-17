// export default function() {
//  this.transition(
//     this.childOf('.grid-items'),
//     this.use('explode', {
//       matchBy: 'id',
//       use: ['flyTo', { duration: 100, easing: [250, 15] } ]
//     })
//  );
// }

export default function(){
  let duration = 500;
  this.transition(
    this.fromRoute('city'),
    this.toRoute('event'),
    this.useAndReverse('explode', {
      matchBy: 'data-photo-id',
      use: ['fly-to', {duration}]
    }, {
      use: 'fade'
    })
  );
}
