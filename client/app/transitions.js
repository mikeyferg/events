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
  this.transition(
    this.fromRoute('city'),
    this.toRoute('event'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
