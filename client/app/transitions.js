export default function(){
  let duration = 500;

  this.transition(
    this.toRoute('cities'),
    this.use('toDown')
  );

  this.transition(
    this.fromRoute('cities'),
    this.toRoute('city'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

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
