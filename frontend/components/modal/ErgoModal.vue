<template>
  <Modal
          :modal="modal"
          :title="title"
          :headline="headline"
          :type="type"
  >
    <template v-slot:body>
      <Form ref="form"
            :form="form"
            @close="close"
            @confirm="confirm"
            :keyenter="false"/>
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal';
import Form from '../form/Form';
import Ergo from '../../objects/Ergo';

export default {
  name: 'ErgoModal',
  components: { Form, Modal },
  props: {
    entity: { type: Object },
    parent: { type: Object },
    modal: { type: Boolean },
  },
  data: () => ({
    form: null,
  }),
  watch: {
    modal(newValue) {
      if (newValue) {
        this.initForm();
      }
    },
  },
  computed: {
    isCreate() {
      return this.entity == null;
    },
    title() {
      return `${ this.isCreate ? 'Ajout' : 'Édition' } d'un ergothérapeute`;
    },
    headline() {
      return this.isCreate ? this.parent.name : this.entity.name;
    },
    type() {
      return this.isCreate ? 'add' : 'edit';
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    confirm() {
      let data = this.form.createFormData();
      if (this.isCreate) {
        data['group'] = this.parent.id;
        this.$store.dispatch('ergos/create', data);
      } else {
        data['id'] = this.entity.id;
        let group = this.$store.getters['groups/byId'](this.entity.group);

        if (group.moderator && this.form.getField('is_moderator').isDirty) {
          let old = this.$store.getters['ergos/byId'](group.moderator).name;
          this.$store.commit('dialog/SET_DIALOG', {
            type: 'warning',
            detail: `"${ old }" est déja modérateur de ce groupe. Le remplacer ?`,
            dispatch: { action: `ergos/inviteModerator`, arg: data },
          });
        } else {
          this.$store.dispatch('ergos/update', data);
        }
      }
      this.close();
    },
    initForm() {
      let data = {
        store: this.$store,
        entity: this.entity,
      };
      if (this.isCreate) {
        data['exclude'] = [
          'areas',
          'specialties',
          'phone',
          'website',
          'address',
          'number',
          'zip_code',
          'city',
          'public',
          'is_moderator',
        ];
      }
      this.form = Ergo.getForm(data);

      if (!this.$store.state.auth.user.is_staff) {
        try {
          this.form.getField('is_moderator').disabled = true;
        } catch (e) {
          null;
        }
      }

      if (this.isCreate) {
        this.form.textFields.forEach(i => (i.size = 12));
        this.form.checkBoxes.forEach(i => (i.size = 6));
      } else if (this.entity.is_pending_moderator || this.entity.is_moderator) {
        this.form.getField('is_moderator').disabled = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
