const url = '/cos-monitor/servlet/cos/monitor'

export default {
  'monitorMain': {
    url,
    method: 'GET',
    params: {
      'action': 'monitor'
    },
  },
  'entDict': {
    url,
    method: 'GET',
    params: {
      'action': 'getEntDict'
    },
  },
  'areaDetail': {
    url,
    method: 'GET',
    params: {
      'action': 'GetProvinceStat'
    },
    required: {
      area: 'number'
    }
  },
  'entResource': {
    url,
    method: 'GET',
    params: {
      'action': 'GetExpireDetail'
    },
    required: {
      entId: 'number'
    }
  },
  'test': {
    url: '/test',
    method: 'GET',
  }
}