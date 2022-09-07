const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');

module.exports = {
    name: "closeWithReason",
     async execute(i)  {
       const modal = new Modal()
			.setCustomId('myModal')
			.setTitle('close ticket with reason');

		const reasonInput = new TextInputComponent()
			.setCustomId('reasonInput')
			.setLabel("What's the Reason?")
			.setStyle('PARAGRAPH');
	
		const secondActionRow = new MessageActionRow().addComponents(reasonInput);
    modal.addComponents(secondActionRow);
      
		await i.showModal(modal);
	        
    }
};